import {Client} from './Client';
export enum BudgetState {
  writing = 'Writing',
  editing = 'Editing',
  pending = 'Pending',
  approved = 'Approved',
  denied = 'Denied',
  waiting = 'Waiting',
  all = 'All',
};

export class Budget {
  public title: string;
  public description: string;
  public state: BudgetState;
  public client: string;
  public items: BudgetItem[];
  public get total_price(): number {return 0};  // will be initialized in constructor
  public set total_price(a) {}

  constructor();
  constructor(
    title: string,
    description: string,
    state: BudgetState,
    client: string,
    items: BudgetItem[],
  );
  constructor(
    title?: string,
    description?: string,
    state?: BudgetState,
    client?: string,
    items?: BudgetItem[],
  ) {
    Object.defineProperty( this, 'total_price', {
      enumerable: true,
      get: ( ) => {
        return this.items.map(({subtotal}) => subtotal).reduce((sum, val) => sum + val,0);
      },
      set: () => {}
    } );
    if(title && description && state && client && items) {
      this.title = title;
      this.description = description;
      this.state = state;
      this.client = client;
      this.items = items;
    } else {
      this.title = '';
      this.description = '';
      this.state = BudgetState.writing;
      this.client = '';
      this.items = [new BudgetItem()]
    }
  }
  copy(): Budget {
    let {title, description, state, client,} = this;
    let items = this.items.map(item => item.copy());
    return new Budget(title, description, state, client, items)
  }
}

export class BudgetItem {
  public title: string;
  public quantity: number;
  public price: number;

  get subtotal () {
    return this.quantity * this.price;
  }
  constructor();
  constructor(
    title: string,
    quantity: number,
    price: number,
  );
  constructor(
    title?: string,
    quantity?: number,
    price?: number,
  ) {
    if(title && quantity && price) {
      this.title = title
      this.quantity = quantity;
      this.price = price;
    } else {
      this.title = '';
      this.quantity = 0;
      this.price = 0;
    }
  }

  copy(): BudgetItem {
    let {title, quantity, price,} = this;
    return new BudgetItem(title, quantity, price);
  }
}
