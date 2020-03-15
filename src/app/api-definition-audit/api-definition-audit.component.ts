import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as YAML from 'yaml';

import 'brace';
import 'brace/mode/json';
import 'brace/mode/yaml';
import 'brace/theme/monokai';

import { ApiDefinitionAuditService } from '../api-definition-audit.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-api-definition-audit',
  templateUrl: './api-definition-audit.component.html',
  styleUrls: ['./api-definition-audit.component.scss']
})
export class ApiDefinitionAuditComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('editor') editor;
  file: string | ArrayBuffer = '';
  mode = 'yaml';
  auditResults = [];
  displayedResults = [];
  severities = [
    {
      name: 'Errors',
      severity: 0,
      display: true
    },
    {
      name: 'Warnings',
      severity: 1,
      display: true
    },
    {
      name: 'Infos',
      severity: 2,
      display: true
    },
    {
      name: 'Hints',
      severity: 3,
      display: true
    }
  ];

  constructor(private apiDefinitionAuditService: ApiDefinitionAuditService) { }

  ngOnInit(): void {
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  fileUpload(e) {
    const eventFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.file = fileReader.result;
      this.mode = this.guessType(this.file);
      this.fileInput.nativeElement.value = '';
    };
    fileReader.readAsText(eventFile);
  }

  onAceChange(e) {
    this.mode = this.guessType(this.file);
    let contentType: string;
    if (this.mode === 'yaml') {
      contentType = 'text/yaml';
    } else {
      contentType = 'application/json';
    }
    this.apiDefinitionAuditService.getAudit(this.file, contentType).subscribe(
      (results: any) => {
        this.auditResults = results.sort(this.compare);
        this.display();
      }
    );
  }

  moveToLine(line: number, char: number) {
    this.editor._editor.focus();
    this.editor._editor.gotoLine(line, 0, char);
  }

  severityNumber(severity: number) {
    return this.auditResults.filter(result => result.severity === severity).length;
  }

  display(severity: number = -1) {
    if (severity === -1) {
      this.displayedResults = this.auditResults;
    } else {
      this.displayedResults = this.auditResults.filter(result => result.severity === severity);
    }
  }

  onDisplayChange(event: MatCheckboxChange, severity: number) {
    if (event.checked) {
      this.severities.filter(x => x.severity === severity)[0].display = true;
      this.displayedResults = [...this.displayedResults, ...this.auditResults.filter(result => result.severity === severity)];
      this.displayedResults.sort(this.compare);
    } else {
      this.displayedResults = [];
      this.severities.filter(x => x.severity === severity)[0].display = false;
      for (const s of this.severities.filter(se => se.display)) {
        this.displayedResults = [...this.displayedResults, ...this.auditResults.filter(result => result.severity === s.severity)];
        this.displayedResults.sort(this.compare);
      }
    }
  }

  private guessType(file: any): string {
    try {
      JSON.parse(file);
      return 'json';
    } catch (e) {
      return 'yaml';
    }
  }

  private compare(a, b) {
    if (a.severity > b.severity) return 1;
    if (b.severity > a.severity) return -1;
  
    return 0;
  }
}
