import * as React from 'react';
import { ControlLabel, DropdownButton, FormControl, FormGroup, InputGroup, InputGroupAddon, MenuItem, Panel, SelectCallback } from 'react-bootstrap';

interface IStates {
    isTax: boolean;
    price: number;
    balance: number;
    toCharge: number;
    amount: number;
}
class Calc extends React.Component<{}, IStates> {
    constructor (props:any) {
        super(props);
        this.state = { isTax:true, price:0, balance:0, toCharge:0, amount:0 };

        this.setTax = this.setTax.bind(this);
        this.setNoTax = this.setNoTax.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.changeBalance = this.changeBalance.bind(this);
        this.calcToCharge = this.calcToCharge.bind(this);
        this.leaveOnlyNumber = this.leaveOnlyNumber.bind(this);
    }

    public leaveOnlyNumber(num: number):number {
        const str = `${Math.ceil(num)}`;
        const length = str.length;
        const arr:string[] = [];
        for (let i = 0; i < length; ++i) {
            const st = str.charAt(i);
            if (st === '.') {
                break;
            }
            if (0 <= '0123456789,'.indexOf(st, 0)) {
                arr.push(st);
            }
        }
        return Number(arr.join(''));
    }
    public setTax(eventKey: any, e?: React.SyntheticEvent<{}>) {
        const toCharge = this.calcToCharge(true, this.state.price, this.state.balance);
        this.setState({isTax:true, toCharge});
    }
    public setNoTax(eventKey: any, e?: React.SyntheticEvent<{}>) {
        const toCharge = this.calcToCharge(false, this.state.price, this.state.balance);
        this.setState({isTax:false, toCharge});
    }
    public changePrice(event: React.FormEvent<FormControl>){
        const input = event.target as HTMLInputElement;
        const value = Number(input.value);
        const price:number = this.leaveOnlyNumber(value);
        const toCharge = this.calcToCharge(this.state.isTax, price, this.state.balance);
        this.setState({price, toCharge});
    }
    public changeBalance(event: React.FormEvent<FormControl>) {
        const input = event.target as HTMLInputElement;
        const value = Number(input.value);
        const balance = this.leaveOnlyNumber(value);
        const toCharge = this.calcToCharge(this.state.isTax, this.state.price, balance);
        this.setState({ balance, toCharge });
    }
    public calcToCharge(isTax:boolean, rawPrice:number, balance: number) {
        const price = isTax ? rawPrice : 1.08 * rawPrice;
        let toCharge = 0;
        while (balance + toCharge < price) {
            toCharge += 100;
        }
        return toCharge;
    }

    public render() {
        return (
            <form className="App-intro">
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>価格</InputGroup.Addon>
                        <DropdownButton
                            componentClass={InputGroup.Button}
                            id="input-dropdown-addon"
                            title={this.state.isTax?"税込":"税抜"}>
                            <MenuItem key="1" onSelect={this.setTax}>税込</MenuItem>
                            <MenuItem key="2" onSelect={this.setNoTax}>税抜</MenuItem>
                        </DropdownButton>                        
                        {this.state.price <= 0 ?
                        <FormControl type="number" onChange={this.changePrice} placeholder="0"  /> :
                        <FormControl type="number" onChange={this.changePrice} value={`${this.state.price}`} />}            
                        <InputGroup.Addon>円</InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>残高</InputGroup.Addon>
                        {this.state.balance <= 0 ?
                        <FormControl type="number"　onChange={this.changeBalance} placeholder="0" /> :
                        <FormControl type="number"　onChange={this.changeBalance} value={`${this.state.balance}`}/>} 
                        <InputGroup.Addon>円</InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <Panel>
                    <Panel.Body>
                        送金は<strong>{this.leaveOnlyNumber(this.state.balance + this.state.toCharge)}</strong>円                       
                    </Panel.Body>
                    <Panel.Footer>
                        <small>(チャージされるのは{this.state.toCharge}円)</small>
                    </Panel.Footer>
                </Panel>
            </form>
        );
    }
}

export default Calc;
