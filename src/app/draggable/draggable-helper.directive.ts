import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({
  selector: '[appDraggableHelper]',
  exportAs: 'appDraggableHelper'
})
export class DraggableHelperDirective implements OnInit {

  constructor(private draggable: DraggableDirective,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.draggable.dragStart.subscribe(() => this.onDragStart());
    this.draggable.dragEnd.subscribe(() => this.onDragEnd());
  }


  onDragStart(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  onDragEnd(): void {
    this.viewContainerRef.clear();
  }

}
