class Triangulo extends Figura {
    constructor(lado1, lado2, lado3) {
        super('Triángulo');
        this.lado1 = lado1;
        this.lado2 = lado2;
        this.lado3 = lado3;
    }

    calcularAreaConHeron() {
        const s = this.calcularPerimetro() / 2;
        return Math.sqrt(s * (s - this.lado1) * (s - this.lado2) * (s - this.lado3));
    }

    calcularAreaConAltura(base, altura) {
        return (base * altura) / 2;
    }

    calcularPerimetro() {
        return this.lado1 + this.lado2 + this.lado3;
    }

    determinarTipo() {
        if (this.lado1 === this.lado2 && this.lado2 === this.lado3) {
            return 'Equilátero';
        } else if (this.lado1 === this.lado2 || this.lado2 === this.lado3 || this.lado1 === this.lado3) {
            return 'Isósceles';
        } else {
            return 'Escaleno';
        }
    }
}
