import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { MoveableDirective } from './moveable.directive';
import { DraggableHelperDirective } from './draggable-helper.directive';
import { OverlayModule } from '../../../node_modules/@angular/cdk/overlay';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [DraggableDirective, MoveableDirective, DraggableHelperDirective],
  exports: [DraggableDirective, MoveableDirective, DraggableHelperDirective]
})
export class DraggableModule { }
