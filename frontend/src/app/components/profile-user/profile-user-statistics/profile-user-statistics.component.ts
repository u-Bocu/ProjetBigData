import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-profile-user-statistics',
  templateUrl: './profile-user-statistics.component.html',
  styleUrls: ['./profile-user-statistics.component.css']
})
export class ProfileUserStatisticsComponent implements OnInit {
  public loading: boolean = false;
  public statistics: Array<any> = [];

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    const chartDom = document.getElementById('main')!;
    const myChart = echarts.init(chartDom);
    let option: echarts.EChartsOption;

    this.loading = true;
    const idUser: number = parseInt(this.localStorageService.getData('user_id')) as unknown as number;
    this.userService.getGraphAvgScoreByTheme(idUser).subscribe(response => {
      this.statistics = response.data.rows;
      this.loading = false;

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };

      option && myChart.setOption(option);
    });
  }
}
