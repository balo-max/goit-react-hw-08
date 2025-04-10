import AppBar from "../AppBar/AppBar";
import Container from "../Container/Container";
import Section from "../Section/Section";

export default function Layout({children}) {
    return (
        <>
            <AppBar />
            <Section>
                <Container>
                    {children}
                </Container>
            </Section>
        </>
    )
}