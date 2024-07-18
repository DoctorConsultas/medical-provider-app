// src/app/components/home-summary/home-summary.component.ts
import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { SummaryService } from '../../../services/summary.service'; 


@Component({
  selector: 'app-home-summary',
  templateUrl: './home-summary.component.html',
  styleUrl: './home-summary.component.scss'
})

export class HomeSummaryComponent implements OnInit {
  mostPrescribedMedications: { product: string, count: number }[] = [];
  topPrescribingMedics: { medicId: string, count: number }[] = [];
  patientPrescriptionsLastWeek: number = 0;

  // Datos falsos para los gráficos
  single: any[] = [];
  multi: any[] = [];
  dailyPrescriptions: any[] = [];

  view: [number, number] = [700, 400];

  // opciones de los gráficos
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Producto';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';

  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private summaryService: SummaryService) {
    // Datos falsos para los gráficos
    this.single = [
      {
        "name": "Medicamento A",
        "value": 8940000
      },
      {
        "name": "Medicamento B",
        "value": 5000000
      },
      {
        "name": "Medicamento C",
        "value": 7200000
      }
    ];

    this.multi = [
      {
        "name": "Médico 1",
        "series": [
          {
            "name": "2020",
            "value": 7300000
          },
          {
            "name": "2021",
            "value": 8940000
          }
        ]
      },

      {
        "name": "Médico 2",
        "series": [
          {
            "name": "2020",
            "value": 7870000
          },
          {
            "name": "2021",
            "value": 8270000
          }
        ]
      }
    ];

    this.dailyPrescriptions = [
      {
        "name": "Pacientes",
        "series": [
          { "name": "2024-07-01", "value": 5 },
          { "name": "2024-07-02", "value": 8 },
          { "name": "2024-07-03", "value": 4 },
          { "name": "2024-07-04", "value": 6 },
          { "name": "2024-07-05", "value": 7 }
        ]
      }
    ];
  }

  ngOnInit(): void {
    this.summaryService.getMostPrescribedMedications().subscribe(data => {
      this.mostPrescribedMedications = data;
    });

    this.summaryService.getTopPrescribingMedics().subscribe(data => {
      this.topPrescribingMedics = data;
    });

    this.summaryService.getPatientPrescriptionsLastWeek().subscribe(data => {
      this.patientPrescriptionsLastWeek = data;
    });
  }

  onSelect(event: any): void {
    console.log(event);
  }
}
