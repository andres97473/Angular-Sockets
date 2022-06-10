import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
})
export class EncuestaComponent implements OnInit {
  public barChartData: ChartData<'bar'> = {
    labels: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'],
    datasets: [{ data: [0, 0, 0, 0], label: 'Preguntas' }],
  };

  constructor(private http: HttpClient, public wsService: WebsocketService) {}

  ngOnInit(): void {
    this.getData();
    this.escucharSocket();
  }

  getData() {
    this.http.get('http://localhost:5000/grafica2').subscribe((data: any) => {
      // console.log(data);
      this.barChartData = data;
    });
  }

  escucharSocket() {
    this.wsService.listen('cambio-grafica2').subscribe((data: any) => {
      // console.log('socket', data);
      this.barChartData = data;
    });
  }
}
