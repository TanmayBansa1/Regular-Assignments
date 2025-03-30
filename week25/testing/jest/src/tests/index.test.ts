import {describe, expect, it, vi } from 'vitest'
import app from '../index'
import request from 'supertest'
import { db } from '../__mocks__/db'
//shallow mocking
// vi.mock('../db', () => ({
//     db: {
//         request: {
//             create: vi.fn()
//         }
//     }
// }))

// deep mock
vi.mock('../db')

describe('add server', () => {
    it('should add two +ve numbers', async () => {
        //mockresolve
        db.request.create.mockResolvedValue({
            id:1,
            a:1,
            b:2,
            sum:3,
            type:"ADD"
        })
        vi.spyOn(db.request, 'create');
        const result =  (await request(app).post('/sum').send({num1:1,num2:2})).body
        expect(db.request.create).toHaveBeenCalledWith({
            data:{
                a:1,
                b:2,
                sum:3,
                type:"ADD"
            }
        });
        expect(result.sum).toBe(3);
        expect(result).toHaveProperty('id');
        expect(result.id).toBe(1);

    })
    it('should add two -ve numbers', async () => {
        const result = (await request(app).post('/sum').send({num1:-1,num2:-2})).body.sum
        expect(result).toBe(-3);
    })
    it('should add two 0 numbers', async () => {
        const result = (await request(app).post('/sum').send({num1:0,num2:0})).body.sum
        expect(result).toBe(0);
    })
})
