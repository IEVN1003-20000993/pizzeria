import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { Parte1Component } from './components/parte1/parte1.component';
import { Parte2Component } from './components/parte2/parte2.component';
import { Parte3Component } from './components/parte3/parte3.component';

export interface Pedido {
  tamanio: string;
  ingredientes: string[];
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,  
    Parte1Component,
    Parte2Component,
    Parte3Component
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pizzeria';
  orders: Pedido[] = []; 

  onOrderAdded(newOrder: Pedido) {
    this.orders.push(newOrder);
  }
}
