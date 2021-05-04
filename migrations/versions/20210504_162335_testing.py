"""testing

Revision ID: 19733e58ae30
Revises: 9dce71575eb3
Create Date: 2021-05-04 16:23:35.822926

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '19733e58ae30'
down_revision = '9dce71575eb3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('userReviews')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userReviews',
    sa.Column('id', sa.INTEGER(), server_default=sa.text('nextval(\'"userReviews_id_seq"\'::regclass)'), autoincrement=True, nullable=False),
    sa.Column('userId', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('reviewerId', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('rating', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('review', sa.VARCHAR(length=500), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['reviewerId'], ['users.id'], name='userReviews_reviewerId_fkey'),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], name='userReviews_userId_fkey'),
    sa.PrimaryKeyConstraint('id', name='userReviews_pkey')
    )
    # ### end Alembic commands ###