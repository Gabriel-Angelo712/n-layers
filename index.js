#!/usr/bin/env node
"use strict";

import { access, mkdir, constants, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const _dirname = import.meta.dirname;

const ARGS = process.argv.slice(2);
const PATH = ARGS[0];

const PERMISSIONS = {
  all: constants.F_OK,
  write: constants.W_OK,
};
const PATHS = [
  "./src/entities",
  "./src/factories",
  "./src/services",
  "./src/repositories",
  "./src/utils",
  "./docs",
  "./database",
];

function verifyPermission(fn) {
  access(PATH, PERMISSIONS.all | PERMISSIONS.write)
    .then(() => {
      console.log(`Permissions Successfuly verified`);

      fn();
    })
    .catch((err) => {
      throw err;
    });
}

async function* generatePaths() {
  for (const path of PATHS) {
    yield await mkdir(path, { recursive: true })
      .then(function* (dir) {
        yield dir;
      })
      .catch((err) => {
        throw err;
      });
  }
}
const iterator = generatePaths();

function doesPathsExists() {
  for (const path of PATHS) {
    access(path, PERMISSIONS.all)
      .then(() => console.log(`Directory ${path} already exist`))
      .catch(async () => {
        for await (const element of iterator) {
          const dir = element.next().value.replace(_dirname, ".");
          console.log(`Directory ${dir} Succesfuly created`);
        }
      });
  }
}

stat(PATH)
  .then((stats) => {
    let isDirectory = stats.isDirectory();
    if (isDirectory) {
      console.log(`Directory was correctly provided`);
      console.log(`Verifying permissions`);

      verifyPermission(async () => {
        doesPathsExists();
      });
    }
  })
  .catch((err) => {
    throw err;
  });
