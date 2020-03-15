import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiDefinitionAuditService {

  constructor(private readonly http: HttpClient) { }

  getAudit(apiDefinition: string | ArrayBuffer, type: string) {
    return this.http.post('http://localhost:3000/audit_api_definition', apiDefinition, {
      headers: {
        'content-type': type,
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
