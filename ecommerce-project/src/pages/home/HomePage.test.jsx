import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import axios from "axios";
import HomePage from './HomePage';


vi.mock('axios');

describe('HomePage component', () => {

    let loadCart;

    beforeEach(() => {

        loadCart = vi.fn();

        axios.get.mockImplementation(async (urlPath) => {

            if (urlPath === '/api/products') {
                return {
                    data: [{
                        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
                        name: "Adults Plain Cotton T-Shirt - 2 Pack",
                        rating: {
                            stars: 4.5,
                            count: 56
                        },
                        priceCents: 799,
                        keywords: ["tshirts", "apparel", "mens"]
                    },
                    {
                        id: "54e0eccd-8f36-462b-b68a-8182611d9add",
                        image: "images/products/2-slot-toaster-white.jpg",
                        name: "2 Slot Toaster - White",
                        rating: {
                            stars: 5,
                            count: 2197
                        },
                        priceCents: 1899,
                        keywords: ["toaster", "kitchen", "appliances"]
                    }]
                };
            }
        });
    });

    it('displays the products correct', async () => {

        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
            </MemoryRouter>
        );

        const productContainers = await screen.findAllByTestId('product-container');

        expect(productContainers.length).toBe(2);


        expect(
            within(productContainers[0]).getByText('Adults Plain Cotton T-Shirt - 2 Pack')
        ).toBeInTheDocument();

        expect(
            within(productContainers[1]).getByText('2 Slot Toaster - White')
        ).toBeInTheDocument();

    });
});