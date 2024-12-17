/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8c1278f2-6f53-4727-b803-1a4c297c191f/d9n3yys-37b9f72c-2fe1-4faf-aa09-fef1702e2730.png/v1/fill/w_856,h_934/rare_logo_vector_by_greenmachine987_d9n3yys-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTc0NSIsInBhdGgiOiJcL2ZcLzhjMTI3OGYyLTZmNTMtNDcyNy1iODAzLTFhNGMyOTdjMTkxZlwvZDluM3l5cy0zN2I5ZjcyYy0yZmUxLTRmYWYtYWEwOS1mZWYxNzAyZTI3MzAucG5nIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.pg7kWApdywIefNVcMViF07ebilSjL5pv0pA6XHO1sNA"
              alt="Droplet, the Water Management Mascot!"
              height="40px"
            />
          </Navbar.Brand>
        </Link>
        <Link passHref href="/">
          <Navbar.Brand>Rare</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          >
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}

            <div style={{
              display: 'flex',
            }}
            >
              <Link passHref href="/">
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link passHref href="/posts">
                <Nav.Link>Posts</Nav.Link>
              </Link>
              <Link passHref href="/tags">
                <Nav.Link>Tags</Nav.Link>
              </Link>
              <Link passHref href="/category">
                <Nav.Link>Category</Nav.Link>
              </Link>
            </div>
            <div style={{
              display: 'flex',
              marginLeft: 'auto',
            }}
            >
              <Button variant="danger" onClick={signOut}>
                Sign Out
              </Button>
            </div>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
