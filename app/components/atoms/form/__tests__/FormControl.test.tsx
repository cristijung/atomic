import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormContato from '../FormContato'; 

// mock para window.alert e console.log
let alertSpy: jest.SpyInstance;
let consoleLogSpy: jest.SpyInstance;

beforeAll(() => {
  alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  // limpa o histórico de chamadas dos mocks após cada teste
  alertSpy.mockClear();
  consoleLogSpy.mockClear();
});

afterAll(() => {
  // restaura as implementações originais
  alertSpy.mockRestore();
  consoleLogSpy.mockRestore();
});

describe('FormContato Component', () => {
  // function auxiliar para renderizar o componente e configurar userEvent
  const setupTest = () => {
    const user = userEvent.setup();
    render(<FormContato />);
    return { user };
  };

  // functions auxiliares para obter elementos do formulário
  const getNomeInput = () => screen.getByLabelText(/nome completo/i);
  const getEmailInput = () => screen.getByLabelText(/email/i);
  const getCategoriaSelect = () => screen.getByLabelText(/categoria da mensagem/i);
  const getMensagemTextarea = () => screen.getByLabelText(/sua mensagem/i);
  const getSubmitButton = () => screen.getByRole('button', { name: /enviar mensagem/i });
  const getClearButton = () => screen.getByRole('button', { name: /limpar/i });

  // --- testes de renderização --> importante ---
  test('deve renderizar todos os campos e botões do formulário corretamente', () => {
    setupTest();
    expect(getNomeInput()).toBeInTheDocument();
    expect(getEmailInput()).toBeInTheDocument();
    expect(getCategoriaSelect()).toBeInTheDocument();
    expect(getMensagemTextarea()).toBeInTheDocument();
    expect(getSubmitButton()).toBeInTheDocument();
    expect(getClearButton()).toBeInTheDocument();

    // verifica valores iniciais
    expect(getNomeInput()).toHaveValue('');
    expect(getEmailInput()).toHaveValue('');
    expect(getCategoriaSelect()).toHaveValue(''); // Opção placeholder "Selecione uma categoria..."
    expect(getMensagemTextarea()).toHaveValue('');
  });

  // --- testes de validação do form ---
  describe('Validação de Erros', () => {
    test('deve exibir mensagens de erro para todos os campos obrigatórios ao submeter formulário vazio', async () => {
      const { user } = setupTest();
      await user.click(getSubmitButton());

      expect(await screen.findByText('O nome deve ter pelo menos 3 caracteres.')).toBeInTheDocument();
      expect(await screen.findByText('Por favor, insira um email válido.')).toBeInTheDocument();
      expect(await screen.findByText('Por favor, selecione uma categoria válida.')).toBeInTheDocument();
      expect(await screen.findByText('A mensagem deve ter pelo menos 10 caracteres.')).toBeInTheDocument();
    });

    test('deve exibir erro de validação para nome muito curto', async () => {
      const { user } = setupTest();
      await user.type(getNomeInput(), 'ab');
      await user.click(getSubmitButton());
      expect(await screen.findByText('O nome deve ter pelo menos 3 caracteres.')).toBeInTheDocument();
    });

    test('deve exibir erro de validação para formato de email inválido', async () => {
      const { user } = setupTest();
      await user.type(getEmailInput(), 'emailinvalido');
      await user.click(getSubmitButton());
      expect(await screen.findByText('Por favor, insira um email válido.')).toBeInTheDocument();
    });

    test('deve exibir erro de validação para mensagem muito curta', async () => {
      const { user } = setupTest();
      await user.type(getMensagemTextarea(), 'curta');
      await user.click(getSubmitButton());
      expect(await screen.findByText('A mensagem deve ter pelo menos 10 caracteres.')).toBeInTheDocument();
    });

    test('deve exibir erro de validação para mensagem muito longa', async () => {
      const { user } = setupTest();
      const mensagemLonga = 'a'.repeat(501);
      await user.type(getMensagemTextarea(), mensagemLonga);
      await user.click(getSubmitButton());
      expect(await screen.findByText('A mensagem não pode exceder 500 caracteres.')).toBeInTheDocument();
    });

    test('não deve exibir erros com entradas válidas antes da submissão', async () => {
        const { user } = setupTest();
        await user.type(getNomeInput(), 'Nome Valido');
        await user.type(getEmailInput(), 'valido@email.com');
        await user.selectOptions(getCategoriaSelect(), 'duvida');
        await user.type(getMensagemTextarea(), 'Esta é uma mensagem válida com mais de dez caracteres.');

        expect(screen.queryByText('O nome deve ter pelo menos 3 caracteres.')).not.toBeInTheDocument();
        expect(screen.queryByText('Por favor, insira um email válido.')).not.toBeInTheDocument();
        expect(screen.queryByText('Por favor, selecione uma categoria válida.')).not.toBeInTheDocument();
        expect(screen.queryByText('A mensagem deve ter pelo menos 10 caracteres.')).not.toBeInTheDocument();
    });
  });

  // --- testes de Submissão ---
  describe('Submissão do Formulário', () => {
    // usando timers falsos para controlar o setTimeout da simulação de API
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers(); // garante que todos os timers pendentes sejam executados
        jest.useRealTimers();     // restaura os timers reais
    });

    test('deve submeter dados válidos, mostrar alerta, logar dados e limpar o formulário', async () => {
      const { user } = setupTest();
      const nome = 'Usuário Teste';
      const email = 'teste@exemplo.com';
      const categoria = 'sugestao';
      const mensagem = 'Esta é uma mensagem de teste válida para submissão.';

      await user.type(getNomeInput(), nome);
      await user.type(getEmailInput(), email);
      await user.selectOptions(getCategoriaSelect(), categoria); // 'sugestao' é o value
      await user.type(getMensagemTextarea(), mensagem);

      // clicar no botão de submeter
      const submitButton = getSubmitButton();
      user.click(submitButton); // Não usar await aqui para testar estados intermediários

      // verifica o estado "Enviando..." e btns desabilitados
      await waitFor(() => {
        expect(submitButton).toHaveTextContent('Enviando...');
        expect(submitButton).toBeDisabled();
        expect(getClearButton()).toBeDisabled();
      });

      // avança os timers para simular a espera da API
      jest.advanceTimersByTime(1500);

      // verifica se o alerta foi chamado
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          `Mensagem enviada com sucesso por ${nome}! Categoria: ${categoria}`
        );
      });
      
      // verifica se o console.log foi chamado com os dados corretos
      expect(consoleLogSpy).toHaveBeenCalledWith('Dados do formulário validados:', {
        nome,
        email,
        categoriaDaMensagem: categoria,
        mensagem,
      });

      // verifica se o formulário foi limpo
      await waitFor(() => {
        expect(getNomeInput()).toHaveValue('');
        expect(getEmailInput()).toHaveValue('');
        expect(getCategoriaSelect()).toHaveValue('');
        expect(getMensagemTextarea()).toHaveValue('');
      });
      
      // verifica se os btns voltaram ao estado normal
      await waitFor(() => {
          expect(submitButton).toHaveTextContent(/enviar mensagem/i);
          expect(submitButton).toBeEnabled();
          expect(getClearButton()).toBeEnabled();
      });
    });
  });

  // --- testes da funcionalidade de limpar ---
  describe('Funcionalidade do Botão Limpar', () => {
    test('deve limpar todos os campos do formulário ao clicar em "Limpar"', async () => {
      const { user } = setupTest();

      // preenche alguns dados
      await user.type(getNomeInput(), 'Algum Nome');
      await user.type(getEmailInput(), 'algum@email.com');
      await user.selectOptions(getCategoriaSelect(), 'outro');
      await user.type(getMensagemTextarea(), 'Alguma mensagem para ser limpa.');

      // verifica se os dados foram preenchidos
      expect(getNomeInput()).toHaveValue('Algum Nome');
      expect(getEmailInput()).toHaveValue('algum@email.com');
      expect(getCategoriaSelect()).toHaveValue('outro');
      expect(getMensagemTextarea()).toHaveValue('Alguma mensagem para ser limpa.');

      // clica no botão Limpar
      await user.click(getClearButton());

      // verifica se os campos foram limpos
      expect(getNomeInput()).toHaveValue('');
      expect(getEmailInput()).toHaveValue('');
      expect(getCategoriaSelect()).toHaveValue('');
      expect(getMensagemTextarea()).toHaveValue('');
    });

    test('o botão "Limpar" não deve submeter o formulário', async () => {
        const { user } = setupTest();
  
        await user.type(getNomeInput(), 'Nome Teste'); // preenche algo para ter o que limpar
        await user.click(getClearButton());
  
        // verifica se o alerta de submissão e o log não foram chamados
        expect(alertSpy).not.toHaveBeenCalled();
        expect(consoleLogSpy).not.toHaveBeenCalled(); // assumindo que console.log só ocorre no onSubmit
        expect(getNomeInput()).toHaveValue(''); // confirma que o formulário foi limpo
      });
  });
});

