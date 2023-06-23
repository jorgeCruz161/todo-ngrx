import { createReducer, on } from '@ngrx/store';
import { borrar, clear, crear, editar, toggle, toggleAll } from './todo.actions';
import { Todo } from './models/todo.models'

export const initialState: Todo[] = [
    new Todo( 'Salvar el mundo' ),
    new Todo( 'Matar a Thanos' ),
    new Todo( 'Conseguir Traje de Ironman' ),
    new Todo( 'Hacer enojar a Hulk' ),
];

export const _todoReducer = createReducer(
    initialState,
    on( crear, (state, {texto}) => [...state, new Todo(texto) ] ),

    on( clear , state => state.filter( todo => !todo.completado ) ),
    
    on( borrar,( state, {id} ) => state.filter( todo => todo.id !== id  ) ),

    on ( toggleAll, ( state, { completado } ) => state.map( todo => {
        
        return {
            ...todo,
            completado: completado
            }
        })
    ),
    
    on(toggle, (state, { id }) => {
        return state.map( todo => {
            if( todo.id === id ){
                return {
                    ...todo,
                    completado: !todo.completado,
                }
            }else{
                return todo;
            }
           
        })
    }),
    on(editar, (state, { id, texto }) => {
        return state.map( todo => {
            if( todo.id === id ){
                return {
                    ...todo,
                    texto: texto
                }
            }else{
                return todo;
            }
           
        })
    }),

);

export function todoReducer( state, action ){
    return _todoReducer( state, action );
}


