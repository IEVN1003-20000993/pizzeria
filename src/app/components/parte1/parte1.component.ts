import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PedidoServicio } from '../../pedido.service';

export interface Pedido {
  tamanio: string;
  ingredientes: string[];
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-parte1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './parte1.component.html',
  styleUrls: ['./parte1.component.css']
})
export class Parte1Component {

  cliente = { nombre: '', direcc: '', tel: '', pizzas: '' };
  pizza = { tamanio: '', ingredientes: '', cantidad: 1, subtotal: 0 };
  formGroup !: FormGroup;

  ingredientes = [
    { nombre: 'Jamón', precio: 10 },
    { nombre: 'Piña', precio: 10 },
    { nombre: 'Champiñones', precio: 10 }
  ];

  @Output() clienteData = new EventEmitter();

  guardarN() {
    this.clienteData.emit(this.cliente);
  }

  constructor(public pedidoServicio: PedidoServicio, private fb: FormBuilder) { }

  orden: string = "";
  subtotalCalculo: number = 0;
  total: number = 0;
  extras: number = 0;

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      direcc: [''],
      tel: [''],
      tamanio: [''],
      ingrediente1: [false],  
      ingrediente2: [false],
      ingrediente3: [false],  
      cantidad: [1],
      subtotal: [0],
    });
  }

  guardarPizza() {
    const { nombre, direcc, tel, tamanio, ingrediente1, ingrediente2, ingrediente3, cantidad } = this.formGroup.value;

    let precioBase = 0;
    if (tamanio === 'Chica') {
      precioBase = 40;
    } else if (tamanio === 'Mediana') {
      precioBase = 80;
    } else if (tamanio === 'Grande') {
      precioBase = 120;
    }

    this.subtotalCalculo = precioBase * cantidad;

    this.extras = 0;
    if (ingrediente1) this.extras += 10 * cantidad; 
    if (ingrediente2) this.extras += 10 * cantidad; 
    if (ingrediente3) this.extras += 10 * cantidad; 
    this.total = this.subtotalCalculo + this.extras;

    const ingredientesSeleccionados = [];
    if (ingrediente1) ingredientesSeleccionados.push('Jamón');
    if (ingrediente2) ingredientesSeleccionados.push('Piña');
    if (ingrediente3) ingredientesSeleccionados.push('Champiñones');

    this.pedidoServicio.add(nombre, direcc, tel, tamanio, ingredientesSeleccionados.join(', '), cantidad, this.total);
    this.formGroup.reset();
  }
}