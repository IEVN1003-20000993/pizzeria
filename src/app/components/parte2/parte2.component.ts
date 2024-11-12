import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { PedidoServicio } from '../../pedido.service';

@Component({
  selector: 'app-parte2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parte2.component.html',
  styleUrls: ['./parte2.component.css']
})
export class Parte2Component {
  constructor(public pedidoServicio: PedidoServicio) {}

  guardarP() {
    this.pedidoServicio.terminarP();
  }

  quitarPedidosSeleccionados() {
    this.pedidoServicio.ordenes = this.pedidoServicio.ordenes.filter(pedido => !pedido.selected);
    console.log('Pedidos actuales mi panza verde:', this.pedidoServicio.ordenes);
  }

  // Método para verificar si hay algún pedido seleccionado
  hayPedidosSeleccionados(): boolean {
    return this.pedidoServicio.ordenes.some(pedido => pedido.selected);
  }
}
