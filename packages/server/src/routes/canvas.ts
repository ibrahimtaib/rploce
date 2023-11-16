import { Response } from 'fets';
import { router } from '../lib/server.js';
import { canvas, saveCanvas } from '../lib/canvas.js';

const CANVAS_PATH = '/canvas';

router.route({
  path: CANVAS_PATH,
  method: 'GET',
  schemas: {
    responses: {
      200: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      } as const
    }
  },
  handler() {
    return Response.json(canvas);
  }
});

router.route({
  path: '/canvas/row/:row/col/:col/:color',
  method: 'POST',
  schemas: {
    request: {
      type: 'object',
      properties: {
        color: {
          type: 'string',
          description: 'The color to be associated with the element'
        },
        row: {
          type: 'number',
          description: 'The row index of the element'
        },
        col: {
          type: 'number',
          description: 'The column index of the element'
        }
      },
      required: ['color', 'col', 'row']
    },
    responses: {
      200: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      } as const,
      400: {
        type: 'object',
        properties: {
          error: {
            type: 'string'
          }
        }
      } as const
    }
  },
  handler(request) {
    const { color, col, row } = request.params;
    console.log(request.params);
    // Parse the indices as integers
    const rowIndex = parseInt(row);
    const colIndex = parseInt(col);

    // Check if the indices are within bounds
    if (isNaN(rowIndex) || isNaN(colIndex)) {
      return Response.json({
        error: 'Column and row index are wrong'
      });
    }
    if (
      rowIndex < 0 ||
      rowIndex >= canvas.length ||
      colIndex < 0 ||
      colIndex >= canvas[rowIndex].length
    ) {
      return Response.json({
        error: 'Column and row index are out of bounds'
      });
    }

    canvas[rowIndex][colIndex] = color;
    saveCanvas(canvas);
    return Response.json(canvas);
  }
});
router.route({
  path: 'canvas/event',
  method: 'GET',
  schemas: {
    responses: {
      200: {
        type: 'string'
      } as const
    }
  },
  handler() {
    console.log('HERE');
    console.log('HERE');
    console.log('HERE');
    console.log('HERE');
    console.log('HERE');
    console.log('HERE');
    console.log('HERE');
    console.log('HERE');
    console.log('HERE');
    console.log('HERE');
    console.log('HERE');
    console.log('HERE');
    console.log('HERE');
    console.log('HERE');
    return new globalThis.Response(
      new ReadableStream({
        async start(controller) {
          while (true) {
            console.log('data: ' + new Date().toISOString() + '\r\n\r\n');
            controller.enqueue('data: ' + new Date().toISOString() + '\n\n');
            // Simulate delay before sending the next event
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream'
        }
      }
    );
  }
});
