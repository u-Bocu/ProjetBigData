import { Directive, Input, OnInit } from '@angular/core';
import { GridColumns } from "../models/grid-columns";
import { MatGridTile } from "@angular/material/grid-list";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Directive({
  selector: '[gridColspan]'
})
export class GridColspanDirective implements OnInit {
  private gridColspan: GridColumns = {xs: 1, sm: 2, md: 3, lg: 3, xl: 3};

  public get colspan(): GridColumns {
    return this.gridColspan;
  }

  @Input('gridColspan')
  public set colspan(map: GridColumns) {
    if (map && ('object' === (typeof map))) {
      this.gridColspan = map;
    }
  }

  public constructor(private tile: MatGridTile, private breakpointObserver: BreakpointObserver) {
    if(this.tile != null) {
      this.tile.colspan = this.gridColspan.md;
    }
  }

  public ngOnInit(): void {
    if(this.tile != null) {
      this.tile.colspan = this.gridColspan.md;
    }
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {

      if (result.breakpoints[Breakpoints.XSmall]) {
        this.tile.colspan = this.gridColspan.xs;
      }
      if (result.breakpoints[Breakpoints.Small]) {
        this.tile.colspan = this.gridColspan.sm;
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        this.tile.colspan = this.gridColspan.md;
      }
      if (result.breakpoints[Breakpoints.Large]) {
        this.tile.colspan = this.gridColspan.lg;
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        this.tile.colspan = this.gridColspan.xl;
      }
    });
  }
}
