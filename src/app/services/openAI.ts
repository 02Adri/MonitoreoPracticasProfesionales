import {Injectable} from '@angular/core'
import axios from 'axios'

@Injectable({
    providedIn:'root'
})

export class OpenAIService{
/*Api Key */
private apiKey='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';
async sendMessage(message:string):Promise<string>{
    try {
        const response=await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model:'mistralai/mistral-7b-instruct',
                messages:[
                    {role:'system', content:'Eres un asistente de IA para prácticas profesionales. Que ayuda a estudiantes, docentes e instituciones con información útil'},
                    {role:'user', content:message}
                ]
            },
            {
                headers:{
                    'Content-Type':'application/json',
                     Authorization:`Bearer ${this.apiKey}`,
                     'HTTP-Referer':'http://localhost:8100/',
                     'X-Title':'chatbot-monitor'
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error:any) {
        //manejo de errores
        if(error.response?.status===429){
            return 'Lo siento, estoy recibiendo muchas solicitudes. Por favor, intenta de nuevo más tarde.';
        }else if (error.response?.status === 401) {
            return 'API Key inválida o no autorizada.';
          } else {
            console.error(error);
            return 'Error al comunicarse con OpenRouter.';
          }
        
    }
}

}