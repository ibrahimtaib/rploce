import { Response } from 'fets';
import { router } from '../lib/server.js';
import { canvas } from '../lib/canvas.js';

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

// // Assuming canvas is a two-dimensional array

// router.route({
//   path: '/row/{rowNumber}/col/{colNumber}',
//   method: 'GET',
//   schemas: {
//     request: {
//       type: 'object',
//       properties: {
//         color: {
//           type: 'string',
//           description: 'The color to be associated with the element'
//         }
//       },
//       required: ['color']
//     },
//     responses: {
//       200: {
//         type: 'string' // Assuming your canvas contains strings, adjust as needed
//       } as const,
//       400: {
//         type: 'object',
//         properties: {
//           error: {
//             type: 'string'
//           }
//         }
//       } as const
//     }
//   },
//   handler(request) {
//     const { rowNumber, colNumber } = request.params;
//     const { color } = request.body;
//     // Parse the indices as integers
//     const rowIndex = parseInt(rowNumber);
//     const colIndex = parseInt(colNumber);

//     // Check if the indices are within bounds
//     if (isNaN(rowIndex) || isNaN(colIndex)) {
//       return Response.json({
//         error: 'Column and row index are wrong'
//       });
//     }
//     if (
//       rowIndex < 0 ||
//       rowIndex >= canvas.length ||
//       colIndex < 0 ||
//       colIndex >= canvas[rowIndex].length
//     ) {
//       return Response.json({
//         error: 'Column and row index are out of bounds'
//       });
//     }

//     canvas[rowIndex][colIndex] = color;
//     return Response.json('Color successfully changed');
//   }
// });
