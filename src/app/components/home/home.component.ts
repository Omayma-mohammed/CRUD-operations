import {Component, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common'
import {ToastrService} from 'ngx-toastr';
import {ClientsDataService} from '../../services/clients-data.service';
import * as Highcharts from 'highcharts';
import {Chart, ChartModule} from 'angular-highcharts';

interface CustomPoint extends Highcharts.Point {
  value: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ChartModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {ngSkipHydration: 'true'},

})

export class HomeComponent implements OnInit {
  data: any;
  displayedData: any;
  chart: any;
  viewText = 'View All';
  viewAllFlag = false;

  constructor(private router: Router, private render: Renderer2, private toastr: ToastrService, private ClientsDataService: ClientsDataService) {
  }

  ngOnInit(): void {
    this.ClientsDataService.getPosts().subscribe(data => {
      this.data = data;
      this.displayedData = [];
      for (let i = 0; i < 4; i++) {
        this.displayedData.push(this.data[i])
      }
      this.initDonut();
    });
  }


 
  initDonut() {
    this.chart = new Chart({
      chart: {
        plotBackgroundColor: '',
        plotBorderWidth: 0,
        plotShadow: false,
        height: 200,
      },
      title: {
        text: '<strong>6K</strong>',
        align: 'left',
        verticalAlign: 'middle',
        x: 110,
        y: 15,
      },
      legend: {
        labelFormatter: function () {
          const point = this as CustomPoint;

          return point.y + 'M ' + point.name;
        },
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        x: 0
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            distance: 0,
            style: {
              fontWeight: 'bold',
              color: 'white',
            },
          },
          startAngle: 0,
          center: ['50%', '50%'],
          size: '100%',
          showInLegend: true,
        },
      },
      series: [
        {
          name: 'Jobs',
          data: [
            {
              name: 'In Progress',
              y: 4,
              color: '#0258A2'
            },
            {
              name: 'Success',
              y: 2,
              color: '#4E9A4A'
            },
            {
              name: 'Failed',
              y: 1,
              color: '#DE7131'
            }
          ],
          type: 'pie',
          innerSize: '85%',
        },
      ],
    });
  }

  viewAll() {
    this.viewAllFlag = !this.viewAllFlag;
    if (!this.viewAllFlag) {
      this.viewText = 'View All';
      this.displayedData = [];
      for (let i = 0; i < 4; i++) {
        this.displayedData.push(this.data[i])
      }
    } else {
      this.viewText = 'View Less';
      this.displayedData = this.data;
    }
  }
}
