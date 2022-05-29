import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../components/button'
import LinkButton from '../components/button/link_button';

describe('Button', () => {
    it('should render Button component', () => {
        render(
            <Button title='Botão' onClick={() => {}}/>
        );
    
        expect(screen.getByTestId('button')).not.toBe(null);
    })
})

describe('LinkButton', () => {

    const linkButtonText = 'Botão de link'

    it('should render LinkButton component', () => {
        render(
            <LinkButton title={linkButtonText} onClick={() => {}}/>
        );
    
        expect(screen.getByText(linkButtonText)).not.toBe(null);
    })

    it('should render loading effect on LinkButton component', () => {
        render(
            <LinkButton loading title={linkButtonText} onClick={() => {}}/>
        );
    
        expect(screen.queryByText(linkButtonText)).toBe(null);
        expect(screen.getByTestId('linkbutton-loading')).not.toBe(null);
    })



    it('should call callback function onClick', () => {
        const onPressButtonFN = jest.fn()

        render(
            <LinkButton title={linkButtonText} onClick={onPressButtonFN}/>
        );
    
        const button = screen.getByText(linkButtonText)

        fireEvent(button, new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
         }))

        expect(onPressButtonFN).toBeCalled()
    })

})