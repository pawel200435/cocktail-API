import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Cocktail recipes API! <br> Find the API documentation at <a href="http://localhost:3000/api">Coctails API</a>';
  }
}
