import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    // Entradas
    @track numero1 = '';
    @track numero2 = '';

    // Saída
    @track resultado = '';
    @track mensagemErro = '';

    // Handlers de input
    handleChangeNumero1(event) {
        this.numero1 = event.target.value;
        this.limparMensagens();
    }

    handleChangeNumero2(event) {
        this.numero2 = event.target.value;
        this.limparMensagens();
    }

    // Operações
    handleAdicionar() {
        const { n1, n2 } = this.obterNumerosValidos();
        if (!this.temErro()) {
            this.resultado = n1 + n2;
        }
    }

    handleSubtrair() {
        const { n1, n2 } = this.obterNumerosValidos();
        if (!this.temErro()) {
            this.resultado = n1 - n2;
        }
    }

    handleMultiplicar() {
        const { n1, n2 } = this.obterNumerosValidos();
        if (!this.temErro()) {
            this.resultado = n1 * n2;
        }
    }

    handleDividir() {
        const { n1, n2 } = this.obterNumerosValidos();
        if (!this.temErro()) {
            if (n2 === 0) {
                this.mensagemErro = 'Divisão por zero não é permitida.';
                this.resultado = '';
                return;
            }
            this.resultado = n1 / n2;
        }
    }

    // Utilidades
    limparMensagens() {
        this.mensagemErro = '';
        // Não limpar resultado automaticamente para o usuário comparar se quiser
    }

    temErro() {
        return this.mensagemErro && this.mensagemErro.length > 0;
    }

    obterNumerosValidos() {
        this.mensagemErro = '';
        let n1 = Number(this.numero1);
        let n2 = Number(this.numero2);

        const campo1Invalido = this.numero1 === '' || isNaN(n1);
        const campo2Invalido = this.numero2 === '' || isNaN(n2);

        if (campo1Invalido && campo2Invalido) {
            this.mensagemErro = 'Informe valores numéricos nos campos Número 1 e Número 2.';
            this.resultado = '';
            return { n1: 0, n2: 0 };
        }
        if (campo1Invalido) {
            this.mensagemErro = 'Informe um valor numérico em Número 1.';
            this.resultado = '';
            return { n1: 0, n2: 0 };
        }
        if (campo2Invalido) {
            this.mensagemErro = 'Informe um valor numérico em Número 2.';
            this.resultado = '';
            return { n1: 0, n2: 0 };
        }

        return { n1, n2 };
    }
}
