
import { cleanup } from '@testing-library/react';
import { vi } from 'vitest'

vi.mock('zustand') // to make it works like Jest (auto-mocking)

afterEach(() => {
    cleanup();
  });
  