import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { MoveableDirective } from './moveable.directive';
import { DraggableHelperDirective } from './draggable-helper.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DraggableDirective, MoveableDirective, DraggableHelperDirective],
  exports: [DraggableDirective, MoveableDirective, DraggableHelperDirective]
})
export class DraggableModule { }
