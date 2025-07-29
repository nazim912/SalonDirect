import Service from '../models/Service';
import BaseService from './BaseService';

export class ServiceService extends BaseService<Service> {
}

export const serviceService = new ServiceService(Service);
