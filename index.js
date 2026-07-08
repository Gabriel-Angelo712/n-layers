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

async function generatePaths(path) {
  await mkdir(path, { recursive: true })
    .then(() => console.log(`Directory ${path} successfully created`))
    .catch((err) => {
      throw err;
    });
}

function doesPathsExists() {
  for (const path of PATHS) {
    access(path, PERMISSIONS.all)
      .then(() => console.log(`Directory ${path} already exist`))
      .catch(async () => {
        generatePaths(path);
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
