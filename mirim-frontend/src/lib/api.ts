import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: process.env.INTERNAL_API_BASE as string
})

// Interceptor global de resposta
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Erro de resposta do servidor
    if (error.response) {
      const status = error.response.status

      switch (status) {
        case 400:
          console.error('Requisição inválida')
          break
        case 401:
          console.error('Não autorizado')
          // Exemplo: redirecionar para login
          // window.location.href = '/login'
          break
        case 403:
          console.error('Acesso negado')
          break
        case 404:
          console.error('Recurso não encontrado')
          break
        case 500:
          console.error('Erro interno do servidor')
          break
        default:
          console.error('Erro inesperado:', status)
      }
    }
    // Erro sem resposta (timeout, rede, etc)
    else if (error.request) {
      console.error('Erro de conexão com o servidor')
    }
    // Erro ao configurar requisição
    else {
      console.error('Erro na configuração da requisição:', error.message)
    }

    return Promise.reject(error)
  }
)