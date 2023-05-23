import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {LocalStorageService} from '../../../services/local-storage.service';
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-profile-user-statistics',
  templateUrl: './profile-user-statistics.component.html',
  styleUrls: ['./profile-user-statistics.component.css']
})
export class ProfileUserStatisticsComponent implements OnInit, OnChanges {
  public loading: boolean = false;
  public statistics: Array<any> = [];
  private themes: Array<string> = [];
  private scores: Array<string> = [];
  chartOptions: EChartsOption | null = null;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.loading = true;
    const idUser: number = parseInt(this.localStorageService.getData('user_id'));
    this.userService.getGraphAvgScoreByTheme(idUser).subscribe(response => {
      this.statistics = response.data.rows;

      this.statistics.forEach(item => {
        this.themes.push(item.Theme);
        this.scores.push(item.Score_moyen);
      })

      this.loading = false;
      this.loadChartOptions();
    });
  }

  private loadChartOptions() {
    this.chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend: {
        data: [
          'Moyenne par thème'
        ]
      },
      xAxis: [
        {
          type: 'category',
          data: this.themes,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Score moyen (en points / 10)'
        }
      ],
      series: [
        {
          name: 'Moyenne par thème',
          type: 'bar',
          data: this.scores
        }
      ]
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChartOptions();
  }
}
