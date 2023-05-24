import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EChartsOption} from "echarts";
import { ResultatService } from 'src/app/services/resultat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  public loading: boolean = false;
  public participants: Array<any> = [];
  private themes: Array<string> = [];
  private nombre: Array<string> = [];
  chartOptions: EChartsOption | null = null;

  constructor(
    private resultatService: ResultatService
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.resultatService.getParticipants().subscribe(response => {
      this.participants = response.data.rows;

      this.participants.forEach(item => {
        this.themes.push(item.Theme);
        this.nombre.push(item.Participant);
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
          'Nombre de participants par thèmes'
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
          name: 'Nombre de participants'
        }
      ],
      series: [
        {
          name: 'Thème',
          type: 'bar',
          data: this.nombre
        }
      ]
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChartOptions();
  }
}
