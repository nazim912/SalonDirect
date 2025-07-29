import { Request, Response } from 'express';
import BaseController from './BaseController';
import { serviceService } from '../services/ServiceService';
import Service from '../models/Service';

export class ServiceController extends BaseController<Service> {
  constructor() {
    super(serviceService, 'Service');
  }
}

export const serviceController = new ServiceController();
