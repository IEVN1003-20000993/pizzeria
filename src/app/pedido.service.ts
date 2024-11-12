import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoServicio {
  
  ordenes: any[] = [];
  pedido: any[] = [];

  constructor() { }

  add(nombre: string, direcc: string, tel: string, tamanio: string, ingredientes: string, cantidad: number, subtotal: number) {
    const nuevaOrden = {
      nombre,
      direcc,
      tel,
      tamanio,
      ingredientes,
      cantidad,
      subtotal
    };
    this.ordenes.push(nuevaOrden);
  }

  terminarP() {
    const pedidoGuardado = JSON.parse(localStorage.getItem('pedido') || '[]');

    pedidoGuardado.push(...this.ordenes);

    localStorage.setItem('pedido', JSON.stringify(pedidoGuardado));

    this.ordenes = [];

    pedidoGuardado.forEach((orden: any) => {
      console.log(orden.nombre);
      console.log(orden.direcc);
    });

  }

  quitarP(index: number) {
    this.ordenes.splice(index, 1);
  }

  funcionVentasDia() {
    const pedidoGuardado = JSON.parse(localStorage.getItem('pedido') || '[]');


    const ventasPorNombre = pedidoGuardado.reduce((totales: any, orden: any) => {
      if (!totales[orden.nombre]) {
        totales[orden.nombre] = 0;
      }
      totales[orden.nombre] += orden.subtotal;
      return totales;
    }, {});

    return ventasPorNombre;
  }

}