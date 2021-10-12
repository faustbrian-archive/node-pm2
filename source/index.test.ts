import { ExecaSyncReturnValue } from "execa";
import { resolve } from "path";

import { Process, ProcessDescription, ProcessState } from ".";

function start(name: string): ExecaSyncReturnValue {
  return subject.start(
    {
      script: resolve(__dirname, "../processes/app.js"),
    },
    { name },
  );
}

function kill(): void {
  try {
    subject.stop("stub");
    subject.stop("hapi");
  } catch {
    // not running...
  }
}

const subject: Process = new Process();

beforeAll(() => {
  kill();

  start("hapi");
});

afterAll(() => kill());

test(".list()", () => {
  const processes: ProcessDescription[] | undefined = subject.list();

  expect(Array.isArray(processes)).toBe(true);
  expect(processes).toHaveLength(1);
});

test(".describe()", () => {
  const process: ProcessDescription | undefined = subject.describe("hapi");

  expect(typeof process).toBe("object");
});

test(".start()", () => {
  const { failed } = start("stub");

  expect(failed).toBe(false);
});

test(".stop()", () => {
  const { failed } = subject.stop("stub");

  expect(failed).toBe(false);
});

test(".restart()", () => {
  const { failed } = subject.restart("stub");

  expect(failed).toBe(false);
});

test(".reload()", () => {
  const { failed } = subject.reload("stub");

  expect(failed).toBe(false);
});

test(".reset()", () => {
  const { failed } = subject.reset("stub");

  expect(failed).toBe(false);
});

test(".delete()", () => {
  const { failed } = subject.delete("stub");

  expect(failed).toBe(false);
});

test(".flush()", () => {
  const { failed } = subject.flush();

  expect(failed).toBe(false);
});

test(".reloadLogs()", () => {
  const { failed } = subject.reloadLogs();

  expect(failed).toBe(false);
});

test(".ping()", () => {
  const { failed } = subject.ping();

  expect(failed).toBe(false);
});

test(".update()", () => {
  const { failed } = subject.update();

  expect(failed).toBe(false);
});

test(".status()", () => {
  expect(subject.status("hapi")).toBe(ProcessState.Online);
});

test(".isOnline()", () => {
  expect(subject.isOnline("hapi")).toBe(true);
});

test(".isStopped()", () => {
  expect(subject.isStopped("hapi")).toBe(false);
});

test(".isStopping()", () => {
  expect(subject.isStopping("hapi")).toBe(false);
});

test(".isWaiting()", () => {
  expect(subject.isWaiting("hapi")).toBe(false);
});

test(".isLaunching()", () => {
  expect(subject.isLaunching("hapi")).toBe(false);
});

test(".isErrored()", () => {
  expect(subject.isErrored("hapi")).toBe(false);
});

test(".isOneLaunch()", () => {
  expect(subject.isOneLaunch("hapi")).toBe(false);
});

test(".isUnknown()", () => {
  expect(subject.isUnknown("hapi")).toBe(false);
});

test(".has()", () => {
  expect(subject.has("hapi")).toBe(true);
});

test(".missing()", () => {
  expect(subject.missing("hapi")).toBe(false);
});
