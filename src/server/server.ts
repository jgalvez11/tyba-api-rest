import express, { Application, json, urlencoded } from 'express';
import logger from '../log/logger';
import indexRouter from '../routes/index.route';

export class Server {
  /**
   * Variable de la aplicación
   *
   * @private
   * @type {Application}
   * @memberof Server
   */
  private app: Application;

  /**
   * Variable del puerto
   *
   * @private
   * @type {(number | string)}
   * @memberof Server
   */
  private port: number | string;

  /**
   * Constructor de la clase
   */
  constructor() {
    this.app = express();
    this.port = process.env.PORT as string;
    this.settings();
    this.middlewares();
  }

  /**
   * Método que despliega el servidor
   */
  listen() {
    this.app.listen(this.port, () =>
      logger.info(`Corriendo servidor en puerto ${this.app.get('port')}`)
    );
  }

  /**
   * Método que contiene la configuración del servidor
   */
  private settings(): void {
    this.app.set('port', this.port);
  }

  /**
   * Método que contiene los middlewares que se usan en la aplicación
   */
  private middlewares(): void {
    // Trabaja los objetos como JSON antes de que lleguen al route
    this.app.use(json());

    // Convierte un formulario a objeto JSON
    this.app.use(urlencoded({ extended: true }));

    // Mapea las rutas de la aplicación
    this.app.use(indexRouter);
  }
}
