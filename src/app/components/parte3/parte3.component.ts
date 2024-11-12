import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoServicio } from '../../pedido.service';

@Component({
  selector: 'app-parte3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parte3.component.html',
  styleUrls: ['./parte3.component.css']  
})
export class Parte3Component {
  ventasPorNombre: { [nombre: string]: number } = {};
  totalVentas: number = 0; 

  constructor(public pedidoServicio: PedidoServicio) {}

  funcionVentas() {
    this.ventasPorNombre = this.pedidoServicio.funcionVentasDia();
    console.log(this.ventasPorNombre);
    
    this.totalVentas = Object.values(this.ventasPorNombre).reduce((acc, valor) => acc + valor, 0);
  }
}
