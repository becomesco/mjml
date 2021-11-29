import * as path from 'path';
import { writeFile } from 'fs/promises';
import { createMjmlComponent, createMjmlPage } from '..';

describe('MJML', async () => {
  it('should create email html and save it', async () => {
    const headAttributes = createMjmlComponent({
      html: () => `
      <mj-attributes>
        <mj-all font-size="18px" line-height="21px" padding="0" color="#2A39ff" />
        <mj-body background-color="#F5F0ED" />
      </mj-attributes>
      `,
    });
    const head = createMjmlComponent<{ title: string }>({
      html: (vars) => `
      <mj-head>
        ${headAttributes()}
        <mj-title>${vars.title}</mj-title>
      </mj-head>
      `,
    });

    const successEmail = createMjmlPage<{ title: string }>({
      html: (vars) => `
      <mjml>
        ${head(vars)}
        <mj-body>
          <mj-section>
            <mj-column width="100%" padding-bottom="30px">
              <mj-text
                align="center"
                color="#4663ff"
                font-size="36px"
                line-height="42px"
                font-weight="700"
              >
                Thank you
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section>
            <mj-column>
              <mj-spacer height="20px" />
            </mj-column>
          </mj-section>
          <mj-section>
            <mj-column width="100%" padding-bottom="30px">
              <mj-text
                align="center"
                color="#4151ff"
                line-height="32px"
                font-weight="600"
              >
                This is some description
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
      `,
    });
    await writeFile(
      path.join(__dirname, 'output.html'),
      successEmail({
        title: 'Success',
      }),
    );
  });
});
