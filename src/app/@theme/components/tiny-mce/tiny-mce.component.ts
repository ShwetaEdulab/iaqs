import {
  AfterViewInit, Component, ElementRef, forwardRef, Input, NgZone, OnDestroy,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare let tinymce: any;

export const TINYMCE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TinyMCEComponent),
  multi: true
};

@Component({
  selector: 'ngx-tiny-mce',
  template: `<textarea #textArea [value]="value"></textarea>`,
  providers: [TINYMCE_VALUE_ACCESSOR]
})
export class TinyMCEComponent implements AfterViewInit, OnDestroy,  ControlValueAccessor {
  @Input() elementId: String;

  @ViewChild('textArea') textArea: ElementRef;

  editor: any;

  value: string;

  onChange = (_: any) => { };

  constructor(private zone: NgZone) {}

  writeValue(value: any): void {
    this.value = value;
    if (this.editor) {
      this.editor.setContent(value);
    }
  }

  ngAfterViewInit() {
    tinymce.init({
      target: this.textArea.nativeElement,
      plugins: ['link', 'paste', 'table'],
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          //console.log(Zone.current.name);
          this.zone.run(() => this.onChange(content))
        });
        editor.on('click', () => {
          const content = editor.getContent();
          //console.log(Zone.current.name);
          this.zone.run(() => this.onChange(content))
        });
        editor.on('MouseMove', () => {
          const content = editor.getContent();
          //console.log(Zone.current.name);
          this.zone.run(() => this.onChange(content))
        });
      }
    });
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
