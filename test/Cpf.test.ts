import Cpf from "../src/Cpf";

it("Deve validar um cpf válido", function () {
	const cpf = new Cpf("935.411.347-80");
	expect(cpf.value).toBe("935.411.347-80");
});

const wrongSameDigitCpf = [
    "", // vazio
	"111.111.111-11",
	"222.222.222-22",
	"333.333.333-33",
    "123.123.123", // tamanho inválido
];

it.each(wrongSameDigitCpf)("Deve rejeitar um cpf inválido", function (cpf) {
	expect(() => new Cpf(cpf)).toThrow(new Error("CPF Inválido"));
});