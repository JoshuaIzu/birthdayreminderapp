import { Html, Body, Container, Heading, Text } from '@react-email/components';

export default function BirthdayEmail({ name }) {
    return (
        <Html>
            <Body>
                <Container>
                    <Heading>Happy Birthday!</Heading>
                    <Text>Happy Birthday, {name}! Wishing you a fantastic day! Have a blast!</Text>
                </Container>
            </Body>
        </Html>
    );
}