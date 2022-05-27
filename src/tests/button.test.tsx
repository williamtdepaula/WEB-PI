import { render, screen } from '@testing-library/react';
import Button from '../components/button'

it('should render button component', () => {
    render(
        <Button title='Botão' onClick={() => {}}/>
    );

    expect(screen.getByTestId('button')).not.toBe(null);
})