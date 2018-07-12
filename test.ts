import avaTest, { TestInterface } from 'ava';
import { RingBuffer } from './index'

interface Context {
  buffer: RingBuffer
}

const test = avaTest as TestInterface<Context>

test.beforeEach(t => {
  t.context.buffer = new RingBuffer(5)
})


test('returns the number of written elements', (t) => {
  const { buffer } = t.context;

  t.is(buffer.write([1, 2, 3]), 3)
});

test('returns the number of written elements if max size reached', (t) => {
  const { buffer } = t.context;

  buffer.write([1, 2, 3])

  t.is(buffer.write([4, 5, 6]), 2)
});

test('returns an item on read', t => {
  const { buffer } = t.context;

  buffer.write([1, 2, 3])
  buffer.write([4, 5, 6])

  t.is(buffer.read(), 1)
  t.is(buffer.read(), 2)
  t.is(buffer.read(), 3)
})

test('returns undefined if buffer is empty', t => {
  const { buffer } = t.context

  t.is(buffer.read(), undefined)
})

test('random read/write flow', t => {
  const { buffer } = t.context;

  buffer.write([1, 2, 3])

  buffer.read()
  buffer.read()

  buffer.write([4, 5, 6])

  t.is(buffer.read(), 3)
  t.is(buffer.write([1, 2, 3]), 2)

  buffer.read()
  buffer.read()
  buffer.read()
  buffer.read()
  buffer.read()

  t.is(buffer.read(), undefined)
  t.is(buffer.write([1, 2, 3, 4, 5, 6]), 5)
})