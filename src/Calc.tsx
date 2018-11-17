import * as React from 'react';

interface IStates {
    targetNoTax: number;
    target: number;
    balance: number;
    toCharge: number;
    amount: number;
}
class Calc extends React.Component<{}, IStates> {
    constructor (props:any) {
        super(props);
        this.state = { targetNoTax:0, target:0, balance:0, toCharge:0, amount:0 };

        this.calcToCharge = this.calcToCharge.bind(this);
        this.leaveOnlyNumber = this.leaveOnlyNumber.bind(this);
        this.changeTargetNoTax = this.changeTargetNoTax.bind(this);
        this.changeTarget = this.changeTarget.bind(this);
        this.changeBalance = this.changeBalance.bind(this);
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

    public changeTargetNoTax(event:React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            target: this.leaveOnlyNumber(1.08 * Number(event.target.value)),
            targetNoTax: this.leaveOnlyNumber(Number(event.target.value)),
        });
    }
    public changeTarget(event:React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            target: this.leaveOnlyNumber(Number(event.target.value)),
            targetNoTax: this.leaveOnlyNumber(Number(event.target.value) / 1.08),
        });
    }
    public changeBalance(event:React.ChangeEvent<HTMLInputElement>) {
        const balance = this.leaveOnlyNumber(Number(event.target.value));
        const toCharge = this.calcToCharge(balance);
        this.setState({ balance, toCharge });
    }
    public calcToCharge(balance: number) {
        let toCharge = 0;
        while (balance + toCharge < this.state.target) {
            toCharge += 100;
        }
        return toCharge;
    }
    public render() {
        return (
            <p className="App-intro">
                <div>
                    <p>税抜</p>
                    {this.state.targetNoTax <= 0 ?
                    <input type="number" placeholder="0"  onChange={this.changeTargetNoTax} /> :
                    <input type="number" value={`${this.state.targetNoTax}`}  onChange={this.changeTargetNoTax} />} 円
                </div>
                <div>
                    <p>税込</p>
                    {this.state.target <= 0 ?
                    <input type="number" placeholder="0"  onChange={this.changeTarget} /> :
                    <input type="number" value={`${this.state.target}`}  onChange={this.changeTarget} />} 円
                </div>
                <div>
                    <p>残高</p>
                    {this.state.balance <= 0 ?
                    <input type="number" placeholder="0"  onChange={this.changeBalance} /> :
                    <input type="number" value={`${this.state.balance}`}  onChange={this.changeBalance} />} 円
                </div>
                <div>
                    送金は<strong>{this.leaveOnlyNumber(this.state.balance + this.state.toCharge)}</strong>円({this.state.toCharge}円のチャージ)
                </div>
            </p>
        );
    }
}

export default Calc;
