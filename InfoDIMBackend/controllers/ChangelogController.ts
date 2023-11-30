import { Request, Response } from 'express';
import { ChangelogModel } from '../models/Changelog';

export default {
  createChangelog: async (req: Request, res: Response) => {
    const changelog = new ChangelogModel(req.body);
    await changelog.save();
    res.status(201).json(changelog);
  },
  getChangelogs: async (req: Request, res: Response) => {
    const changelogs = await ChangelogModel.find().sort({ timestamp: -1 });
    res.status(200).json(changelogs);
  },
}