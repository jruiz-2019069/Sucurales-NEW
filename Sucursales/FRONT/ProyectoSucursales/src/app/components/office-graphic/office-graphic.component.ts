import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { OfficeProductsRestService } from 'src/app/services/office-products-rest.service';
import { ActivatedRoute } from '@angular/router';
import { OfficeRestService } from 'src/app/services/office-rest.service';

@Component({
  selector: 'app-office-graphic',
  templateUrl: './office-graphic.component.html',
  styleUrls: ['./office-graphic.component.css']
})
export class OfficeGraphicComponent implements OnInit {

  arrayProductsOffice: any = [];

  idOffice: any;

  nameOffice: any;

  chartOptions1 = {
    responsive: true,
    scales: {
        yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }]
    }
  };
  chartLabels1: any = [];
  chartLegend1 = true;
  chartPlugins1 = [];

  chartData1: any = [{
     data: [], 
     label: 'SALES' 
    }];

    chartColors: any = [
      {
        backgroundColor: [],
      },
  ];

  constructor(
    public officeProductRest: OfficeProductsRestService,
    public activatedRoute: ActivatedRoute,
    public officeRest: OfficeRestService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (idRuta) => {
      this.idOffice = idRuta.get("idOffice");
    });
    this.getProductsGrafic(this.idOffice);
    this.getOffice(this.idOffice);
  }

  getProductsGrafic(idOffice: any){
    this.officeProductRest.getProductsOffice(idOffice).subscribe({
      next: (res: any) => {
        this.arrayProductsOffice = res.productsOffice;
        this.arrayProductsOffice.forEach((product: any) => {
            this.chartLabels1.push(product.name);
            this.chartData1[0].data.push(product.totalSales);
            this.chartColors[0].backgroundColor.push(
              `#${Math.floor(Math.random() * 16777215).toString(16)}`
            );
        });
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }

  getOffice(idOffice: any){
    this.officeRest.getOffice(idOffice).subscribe({
      next: (res: any) => {
        this.nameOffice = res.office.name;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
