function mostrarCampos() {
    const figuraSeleccionada = document.getElementById('figura').value;
    const inputFields = document.getElementById('input-fields');
    inputFields.innerHTML = ''; 

    if (figuraSeleccionada === 'rectangulo') {
        inputFields.innerHTML = `
            <label for="base">Base:</label>
            <input type="number" id="base" placeholder="Ingresa la base" required>
            <label for="altura">Altura:</label>
            <input type="number" id="altura" placeholder="Ingresa la altura" required>
        `;
    } else if (figuraSeleccionada === 'circulo') {
        inputFields.innerHTML = `
            <label for="radio">Radio:</label>
            <input type="number" id="radio" placeholder="Ingresa el radio" required>
        `;
    } else if (figuraSeleccionada === 'cuadrado') {
        inputFields.innerHTML = `
            <label for="lado">Lado:</label>
            <input type="number" id="lado" placeholder="Ingresa el lado" required>
        `;
    } else if (figuraSeleccionada === 'triangulo') {
        inputFields.innerHTML = `
            <label for="lado1">Lado 1:</label>
            <input type="number" id="lado1" placeholder="Ingresa el lado 1" required>
            <label for="lado2">Lado 2:</label>
            <input type="number" id="lado2" placeholder="Ingresa el lado 2" required>
            <label for="lado3">Lado 3:</label>
            <input type="number" id="lado3" placeholder="Ingresa el lado 3" required>
            <label for="usarAltura">¿Deseas usar altura para el cálculo?</label>
            <select id="usarAltura" onchange="mostrarCampoAltura()">
                <option value="no">No</option>
                <option value="si">Sí</option>
            </select>
            <div id="campoAltura" style="display: none;">
                <label for="base">Base:</label>
                <input type="number" id="base" placeholder="Ingresa la base">
                <label for="altura">Altura:</label>
                <input type="number" id="altura" placeholder="Ingresa la altura">
            </div>
        `;
    }
}

// Mostrar/ocultar los campos de base y altura si se selecciona "Sí"
function mostrarCampoAltura() {
    const usarAltura = document.getElementById('usarAltura').value;
    const campoAltura = document.getElementById('campoAltura');
    campoAltura.style.display = usarAltura === 'si' ? 'block' : 'none';
}

function esTrianguloValido(lado1, lado2, lado3) {
    return (lado1 + lado2 > lado3) && 
           (lado1 + lado3 > lado2) && 
           (lado2 + lado3 > lado1);
}

function calcular() {
    const figuraSeleccionada = document.getElementById('figura').value;
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';  

    let figura;

    if (figuraSeleccionada === 'rectangulo') {
        const base = parseFloat(document.getElementById('base').value);
        const altura = parseFloat(document.getElementById('altura').value);
        if (validarNumero(base) && validarNumero(altura)) {
            figura = new Rectangulo(base, altura);
            resultado.innerHTML = `Área: ${figura.calcularArea()} - Perímetro: ${figura.calcularPerimetro()}`;
        } else {
            resultado.innerHTML = 'Por favor, ingresa valores válidos.';
        }
    } else if (figuraSeleccionada === 'circulo') {
        const radio = parseFloat(document.getElementById('radio').value);
        if (validarNumero(radio)) {
            figura = new Circulo(radio);
            resultado.innerHTML = `Área: ${figura.calcularArea()} - Perímetro: ${figura.calcularPerimetro()}`;
        } else {
            resultado.innerHTML = 'Por favor, ingresa un valor válido.';
        }
    } else if (figuraSeleccionada === 'cuadrado') {
        const lado = parseFloat(document.getElementById('lado').value);
        if (validarNumero(lado)) {
            figura = new Rectangulo(lado, lado);  // Cuadrado es un caso especial de rectángulo
            resultado.innerHTML = `Área: ${figura.calcularArea()} - Perímetro: ${figura.calcularPerimetro()}`;
        } else {
            resultado.innerHTML = 'Por favor, ingresa un valor válido.';
        }
    } else if (figuraSeleccionada === 'triangulo') {
        const usarAltura = document.getElementById('usarAltura').value;

        // Si se elige usar altura, solo validamos la base y la altura
        if (usarAltura === 'si') {
            const base = parseFloat(document.getElementById('base').value);
            const altura = parseFloat(document.getElementById('altura').value);

            if (validarNumero(base) && validarNumero(altura)) {
                figura = new Triangulo(); // No necesitamos los lados si estamos usando base y altura
                resultado.innerHTML = `Área con altura: ${figura.calcularAreaConAltura(base, altura)}`;
            } else {
                resultado.innerHTML = 'Por favor, ingresa valores válidos para la base y la altura.';
            }
        } else {
            // Si no se usa altura, validamos los 3 lados y aplicamos la fórmula de Herón
            const lado1 = parseFloat(document.getElementById('lado1').value);
            const lado2 = parseFloat(document.getElementById('lado2').value);
            const lado3 = parseFloat(document.getElementById('lado3').value);

            if (validarNumero(lado1) && validarNumero(lado2) && validarNumero(lado3)) {
                if (esTrianguloValido(lado1, lado2, lado3)) {
                    figura = new Triangulo(lado1, lado2, lado3);
                    resultado.innerHTML = `Área con Herón: ${figura.calcularAreaConHeron()} - Perímetro: ${figura.calcularPerimetro()} - Tipo: ${figura.determinarTipo()}`;
                } else {
                    resultado.innerHTML = 'Los lados ingresados no forman un triángulo válido.';
                }
            } else {
                resultado.innerHTML = 'Por favor, ingresa valores válidos para los 3 lados.';
            }
        }
    }
}

function validarNumero(valor) {
    return !isNaN(valor) && valor > 0;
}
