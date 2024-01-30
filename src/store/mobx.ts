import { makeAutoObservable } from 'mobx';

class MobX {
  constructor() {
    makeAutoObservable(this);
  }
  
  private _route: string = '/';

  public getRoute(): string {
    return this._route;
  }

  public setRoute(route: string): void {
    this._route = route;
  }

  public isODR(): boolean {
    return process.env.REACT_APP_ROUTE_TYPE === 'ODR';
  }
}

export default new MobX();