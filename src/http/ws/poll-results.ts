import fastify, { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub";
import z from "zod";

export async function pollResults(app: FastifyInstance) { //rota wbesocket 
    app.get('/poll/:pollId/results', { websocket: true}, ( connection, request ) => {
        const getPollParams = z.object({
                    pollId: z.string().uuid(),
                })
                
                const{ pollId } = getPollParams.parse(request.params)


        voting.subscriber(pollId, (message) => {
            connection.socket.send(JSON.stringify(message))
        })
        })
    }

    
