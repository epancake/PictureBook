import { Directive, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { Overlay, OverlayRef, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '../../../node_modules/@angular/cdk/portal';

@Directive({
  selector: '[appDraggableHelper]',
  exportAs: 'appDraggableHelper'
})
export class DraggableHelperDirective implements OnInit, OnDestroy {
  private overlayRef: OverlayRef;
  private positionStrategy = new GlobalPositionStrategy(document);
  private startPosition?: {x: number, y: number};


  constructor(private draggable: DraggableDirective,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private overlay: Overlay) {
  }

  ngOnInit(): void {
    this.draggable.dragStart.subscribe((event) => this.onDragStart(event));
    this.draggable.dragMove.subscribe((event) => this.onDragMove(event));
    this.draggable.dragEnd.subscribe(() => this.onDragEnd());
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy
    });
  }

  ngOnDestroy(): void {
    this.overlayRef.dispose();
  }

  private onDragStart(event: PointerEvent): void {
    this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
    const clientRect = this.draggable.element.nativeElement.getBoundingClientRect();
    this.startPosition = {
      x: event.clientX - clientRect.left
      y: event.clientY - clientRect.top
    }
  }

  private onDragMove(event: PointerEvent): void {
    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
    }
    this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    this.positionStrategy.apply();
  }

  private onDragEnd(): void {
    this.overlayRef.detach();
  }

}
