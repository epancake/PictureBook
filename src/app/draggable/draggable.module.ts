import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { MoveableDirective } from './moveable.directive';
import { OverlayModule } from '../../../node_modules/@angular/cdk/overlay';
import { DropzoneDirective } from './dropzone.directive';
import { DroppableDirective } from './droppable.directive';
import { DroppableService } from './droppable.service';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [
    DraggableDirective,
    MoveableDirective,
    DropzoneDirective,
    DroppableDirective,
  ],
  exports: [
    DraggableDirective,
    MoveableDirective,
    DropzoneDirective,
    DroppableDirective,
  ],
  providers: [
    DroppableService
  ]
})
export class DraggableModule { }
